using System.Windows;

namespace LogWindow.Items
{
    internal class Example1 : IRunnableExample
    {
        public void Run()
        {
            MessageBox.Show("HELLO WORLD!");
            MessageBox.Show("GOODBYE WORLD!");
        }
    }
}
