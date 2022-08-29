using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class EnemyBehavior : MonoBehaviour
{
    public Transform player;
    public Transform patrolRoute;
    public List<Transform> patrolLocations;
    public int lives = 5;

    private int _locationIndex = 0;
    private NavMeshAgent _agent;
    private EnemySpawnerBehavior _enemySpawner;

    public int Lives
    {
        get => lives;
        private set
        {
            lives = value;
            if (lives <= 0)
            {
                _enemySpawner.EnemiesCount--;
                Destroy(this.gameObject);
            }
        }
    }

    private void Start()
    {
        _agent = GetComponent<NavMeshAgent>();
        _enemySpawner = GameObject.Find("EnemySpawner").GetComponent<EnemySpawnerBehavior>();
        player = GameObject.Find("Player").transform;

        InitializePatrolRoute();
        MoveToNextPatrolLocation();
    }

    private void Update()
    {
        if (_agent.remainingDistance < 0.2f && !_agent.pathPending)
        {
            MoveToNextPatrolLocation();
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.name == "Player")
        {
            _agent.destination = player.position;
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.name == "Player")
        {
            MoveToNextPatrolLocation();
        }
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.name == "Bullet(Clone)")
        {
            Lives--;
        }
    }

    private void InitializePatrolRoute()
    {
        foreach (Transform location in patrolRoute)
        {
            patrolLocations.Add(location);
        }
    }

    private void MoveToNextPatrolLocation()
    {
        if (patrolLocations.Count == 0)
        {
            return;
        }

        _agent.destination = patrolLocations[_locationIndex].position;
        _locationIndex = (_locationIndex + 1) % patrolLocations.Count;
    }
}
