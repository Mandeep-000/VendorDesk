import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { BsCart3 } from "react-icons/bs";
import { VscHistory } from "react-icons/vsc";

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all products', path: 'all-products', icon: <MdQueryStats /> },
  { id: 3, text: 'add product', path: 'add-product', icon: <FaWpforms /> },
  { id: 4, text: 'sales/purchase', path: 'sales-purchase', icon: <BsCart3 /> },
  { id: 5, text: 'order history', path: 'order-history', icon: <VscHistory /> },
  { id: 6, text: 'profile', path: 'profile', icon: <ImProfile /> },
]

export default links
