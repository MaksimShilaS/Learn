using Assets.Scripts.Utils;
using UnityEngine;

public class GameBehavior : MonoBehaviour
{
    public int itemsToWin = 1;
    public string labelText = "Collect all 1 items and win your freedom!";

    private int _itemsCollected = 0;
    private int _playerHp = 3;

    private bool showWinScreen = false;
    private bool showLossScreen = false;

    public int ItemsCollected
    {
        get => _itemsCollected;
        set
        {
            _itemsCollected = value;
            if (_itemsCollected >= itemsToWin)
            {
                labelText = "You've found all the items!";
                showWinScreen = true; 
                SceneUtils.StopLevel();
            }
            else
            {
                labelText = $"Item found, only {itemsToWin - ItemsCollected} more to go";
            }
        }
    }

    public int PlayerHp
    {
        get => _playerHp;
        set
        {
            _playerHp = value;
            if (_playerHp <= 0)
            {
                showLossScreen = true;
                SceneUtils.StopLevel();
            }
            else
            {
                labelText = "Ouuchh... That's hurt.";
            }
        }
    }

    private void OnGUI()
    {
        GUI.Box(new Rect(20, 20, 150, 25), $"Player Health: {_playerHp}");
        GUI.Box(new Rect(20, 50, 150, 25), $"Items Collected: {_itemsCollected}");
        GUI.Label(new Rect(Screen.width / 2 - 100, Screen.height - 50, 300, 50), labelText);

        if (showWinScreen || showLossScreen)
        {
            Cursor.visible = true;
            var restartButtonRect = new Rect(Screen.width / 2 - 100, Screen.height / 2 - 50, 200, 100);
            var message = showWinScreen ? "WON" : "LOSE";
            var isRestart = GUI.Button(restartButtonRect, $"YOU {message}!\nPress to start again");
            if (isRestart)
            {
                SceneUtils.RestartLevel();
            }
        }
    }

    
}
