import storeItems from "../data/items.json";
import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";


function Store() {
  return (
    <>
    <h1>Store</h1>
    <Row>
      {storeItems.map((item) => (
        <Col key={item.id}><StoreItem {...item}/></Col>
      ))}
    </Row>
    
    </>
  )
}

export default Store