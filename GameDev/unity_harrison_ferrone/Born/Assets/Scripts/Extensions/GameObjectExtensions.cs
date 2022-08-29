using System;
using UnityEngine;

namespace Assets.Scripts.Extensions
{
    internal static class GameObjectExtensions
    {
        internal static bool IsPlayer(this GameObject gameObject)
        {
            return gameObject.name.Equals("Player", StringComparison.OrdinalIgnoreCase);
        }

        internal static bool IsEnemy(this GameObject gameObject)
        {
            return gameObject.name.Equals("Enemy(Clone)", StringComparison.OrdinalIgnoreCase);
        }
    }
}
