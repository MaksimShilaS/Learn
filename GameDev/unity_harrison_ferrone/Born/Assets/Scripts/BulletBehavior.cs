using UnityEngine;

public class BulletBehavior : MonoBehaviour
{
    public float onScreenDelay = 3f;

    private void Start()
    {
        Destroy(this.gameObject, onScreenDelay);
    }
}
