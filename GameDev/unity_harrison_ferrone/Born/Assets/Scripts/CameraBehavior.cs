using UnityEngine;

public class CameraBehavior : MonoBehaviour
{
    public Vector3 camOffset = new(0f, 1.2f, -5f);

    private Transform playerTransform;

    private void Start()
    {
        playerTransform = GameObject.Find("Player").transform;
    }

    private void LateUpdate()
    {
        this.transform.position = playerTransform.TransformPoint(camOffset);
        this.transform.LookAt(playerTransform);
    }
}
