import moment from 'moment'
import Wrapper from '../assets/wrappers/SalesProduct'
import { MdDeleteOutline } from "react-icons/md";
import { useAppContext } from '../context/appContext'

const SaleProduct = ({
  _id,
  quantity,
  revisedStock,
  exchangeType,
  productDetails,
  createdAt,
  index,
}) => {
  const { deleteOrder } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
 
  return (
    <Wrapper>
        <td>{date}</td>
        <td className='info'>
          {productDetails.name}
        </td>
          <td>{productDetails.brand}</td>
          <td className={`status`}>{quantity}</td>
        <td>{revisedStock}</td>
        <td className='content'>
            <div className='actions'>
              {(exchangeType === 'sales')? (<button className='btn edit-btn' style={{cursor: "default"}}>
                Sold
              </button>): (<button className='btn delete-btn' style={{cursor: "default"}}>
                Purchased
              </button>)}              
            </div>
        </td>
        <td>
          <div className='del-icon' onClick={()=>deleteOrder(_id)}><MdDeleteOutline/></div>
        </td>
    </Wrapper>
  );

}

export default SaleProduct
