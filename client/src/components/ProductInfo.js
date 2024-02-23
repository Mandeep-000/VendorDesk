import Wrapper from '../assets/wrappers/ProductInfo'

const ProductInfo = ({ icon, name, text, hide }) => {
  return (
    <Wrapper hid={hide? 'hidden': ''}>
      <span className='icon'>{icon}</span>
      {name && <span className='name'>{name}:&nbsp;</span>}
      <span className='text'>{text}</span>
    </Wrapper>
  )
}

export default ProductInfo
