import ReactDOM from 'react-dom/client';
import Confirm from '../Components/Confirm/Confirm'

function useConfirm(text, onConfirm){
  return () => {
    const popupElement = document.getElementById('popup')
    const popupRoot = ReactDOM.createRoot(popupElement)

    const confirmFunc = () => {
      popupElement.classList.remove('active')
      popupRoot.unmount()
      onConfirm()
    }
    const rejectFunc = () => {
      popupElement.classList.remove('active')
      popupRoot.unmount()
    }

    popupElement.classList.add('active')
    popupRoot.render(
      <Confirm onConfirm={ confirmFunc } onReject={ rejectFunc } >
        {text}
      </Confirm>
    )
  }
}
export default useConfirm
