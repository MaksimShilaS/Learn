using System;
using UnityEngine;

public class EnemySpawnerBehavior : MonoBehaviour
{
    public int maxEnemiesCount = 5;
    public TimeSpan enemySpawnTimeout = TimeSpan.FromSeconds(5);
    public GameObject enemyGameObject;

    private int _enemiesCount = 0;
    private DateTime _lastSpawnDateTime;

    public int EnemiesCount
    {
        get => _enemiesCount;
        set
        {
            _enemiesCount = value;
        }
    }

    void Start()
    {
        SpawnEnemy();
    }

    void Update()
    {
        SpawnEnemy();

    }

    private void SpawnEnemy()
    {
        var shouldSpawn = _enemiesCount < maxEnemiesCount && DateTime.Now - _lastSpawnDateTime >= enemySpawnTimeout;
        if (shouldSpawn)
        {
            _enemiesCount++;
            _lastSpawnDateTime = DateTime.Now;
            Instantiate(enemyGameObject, this.transform.position, this.transform.rotation);
        }
    }
}
