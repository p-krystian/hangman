import Button from '../Button/Button'

function Lobby({ name, submit }){
  return (
    <Button onClick={ submit }>
      { name }
    </Button>
  )
}
export default Lobby
