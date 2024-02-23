import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaBoxes } from 'react-icons/fa'
import { AiOutlineRise } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import Wrapper from '../assets/wrappers/StatsContainer'
import moment from 'moment'

const StatsContainer = () => {
  const { stats, totalProducts2, monthlySales } = useAppContext()

  const currentDate = moment();
  const formated = currentDate.format('MMM Y');

  const currMonthSale = monthlySales?.find((item)=> item.date === formated)

  const defaultStats = [
    {
      title: 'Monthly Sales',
      count: currMonthSale?.saleCount || 0,
      icon: <AiOutlineRise />,
      color: '#33976a',
      bcg: '#d1e7dd',
    },
    {
      title: 'Total Products',
      count: totalProducts2 || 0,
      icon: <FaBoxes />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Out of Stock',
      count: stats.outOfStock || 0,
      icon: <RiErrorWarningLine />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]
  
  
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
