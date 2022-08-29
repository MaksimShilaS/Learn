using UnityEngine.SceneManagement;
using UnityEngine;

namespace Assets.Scripts.Utils
{
    internal static class SceneUtils
    {
        public static int playerDeaths = 0;

        internal static bool RestartLevel()
        {
            return RestartLevel(0);
        }

        internal static bool RestartLevel(string scene)
        {
            SceneManager.LoadScene(scene);
            Time.timeScale = 1.0f;

            return true;
        }

        internal static bool RestartLevel(int scene)
        {
            SceneManager.LoadScene(scene);
            Time.timeScale = 1.0f;

            return true;
        }

        internal static void StopLevel()
        {
            Time.timeScale = 0f;
        }
    }
}
