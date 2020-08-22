const run = async () => {
  document.getElementById('addPlayerForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const form = e.target

    const lobbyId = form.lobbyId.value
    const playerName = form.playerName.value

    if (playerName) {
      await fetch(`/lobbies/${lobbyId}/${playerName}`, {
        method: 'POST',
      })

      window.location.reload()
    }

    return false
  })

  document.getElementById('addRoomButton').addEventListener('click', async (e) => {
    e.preventDefault()

    await fetch('/lobbies', {
      method: 'POST',
    })

    window.location.reload()
  })

  return false
}

run()
