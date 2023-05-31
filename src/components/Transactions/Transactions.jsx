/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import TransactionItem from "../TransactionItem/TransactionItem"

const Transactions = ({itens, setItens}) => {

  return (
    <div>
      {itens.map((item, index, setItens) => (
        <TransactionItem
          key={index}
          item={item}
          setItens={setItens}
          />
      ))}
    </div>
  )
}


export default Transactions