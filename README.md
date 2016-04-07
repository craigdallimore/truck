# Truck

[x] Server: Serve a page
[x] Server: Stream STDOUT from a spawned process to the page
[ ] CLI: Arg for config
[ ] CLI: Command to open a new tab
[ ] Browser: Keep last 300 lines of stream
[ ] Browser: Show / hide stream
[ ] Broswer: Show when a stream completes
[ ] Browser: Fire notification when a stream completes
[ ] Config: what scripts to make runnable
[ ] Config: REGEX on stream to run another command
[ ] Config: Can turn on / off notifications

```
{
  commands : {
    fire : {
      name    : 'Fire missiles',
      command : './fire.sh',
      onEnd   : 'notify',
      onRegex : [
        {
          exp     : /launch/,
          command : './peace.sh',
          onEnd   : 'notify'
        }
      ]
    },
  }
}
```
