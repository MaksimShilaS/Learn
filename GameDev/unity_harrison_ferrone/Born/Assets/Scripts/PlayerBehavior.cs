using Assets.Scripts.Extensions;
using Unity.VisualScripting;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CapsuleCollider))]
public class PlayerBehavior : MonoBehaviour
{
    public Vector3 spawnPoint = new(0, 6, 0);

    public float moveSpeed = 10f;
    public float rotateSpeed = 125f;

    public float jumpVelocity = 5f;
    public float distanceToGround = 0.2f;
    public LayerMask groundLayer;

    public float bulletSpeed = 100f;
    public GameObject bulletGameObject;

    private float _vInput;
    private float _hInput;
    private Rigidbody _rigidbody;
    private CapsuleCollider _collider;

    private GameBehavior _gameManager;

    private void Start()
    {
        _rigidbody = GetComponent<Rigidbody>();
        _collider = GetComponent<CapsuleCollider>();
        _gameManager = GameObject.Find("GameManager").GetComponent<GameBehavior>();

        this.transform.position = spawnPoint;
        Cursor.visible = false;
    }

    private void Update()
    {
        _vInput = Input.GetAxis("Vertical") * moveSpeed;
        _hInput = Input.GetAxis("Horizontal") * rotateSpeed;

        if (this.transform.position.y < -10)
        {
            this.transform.position = spawnPoint;
            _gameManager.PlayerHp--;
        }

        if (IsGrounded() && Input.GetKeyDown(KeyCode.Space))
        {
            Jump();
        }

        if (Input.GetMouseButtonDown((int)MouseButton.Left))
        {
            Shot();
        }
    }

    private void FixedUpdate()
    {
        Move();
    }

    private void OnCollisionEnter(Collision collision)
    {
        Debug.Log(collision.gameObject.name);
        if (collision.gameObject.IsEnemy())
        {
            _gameManager.PlayerHp--;
        }
    }

    private void Move()
    {
        var rotation = Vector3.up * _hInput;
        var angleRot = Quaternion.Euler(rotation * Time.fixedDeltaTime);

        _rigidbody.MovePosition(this.transform.position + this.transform.forward * _vInput * Time.fixedDeltaTime);
        _rigidbody.MoveRotation(_rigidbody.rotation * angleRot);
    }

    private void Shot()
    {
        var bulletPosition = this.transform.position + new Vector3(1, 0, 0);
        var bulletRotation = this.transform.rotation;
        var bullet = Instantiate(bulletGameObject, bulletPosition, bulletRotation);
        var bulletRigidbody = bullet.GetComponent<Rigidbody>();

        //bulletRigidbody.velocity = this.transform.forward * bulletSpeed;
        bulletRigidbody.AddForce(this.transform.forward * bulletSpeed, ForceMode.Impulse);
    }

    private void Jump()
    {
        _rigidbody.AddForce(Vector3.up * jumpVelocity, ForceMode.Impulse);
    }

    private bool IsGrounded()
    {
        var capsuleX = _collider.bounds.center.x;
        var capsuleY = _collider.bounds.min.y;
        var capsuleZ = _collider.bounds.center.z;
        var capsuleBottom = new Vector3(capsuleX, capsuleY, capsuleZ);

        return Physics.CheckCapsule(
            _collider.bounds.center,
            capsuleBottom,
            distanceToGround,
            groundLayer,
            QueryTriggerInteraction.Ignore);
    }
}
