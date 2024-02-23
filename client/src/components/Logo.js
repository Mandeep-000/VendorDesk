import logo from '../assets/images/favicon.ico'
import { Wrapper, BlueText, Text } from '../assets/wrappers/Logo'

const Logo = () => {
  return (<Wrapper className='logo'>
    <img src={logo} alt='vendordesk'/>
    <Text>Vendor<BlueText>Desk</BlueText></Text>
    </Wrapper>)
}

export default Logo
