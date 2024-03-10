import OrderModel from '../model/Order.model.js'
import mongoose from 'mongoose';

//to get all order details
export async function getAllOrder(req, res){
    try {
        OrderModel.find().then(data=>{
            res.json(data)
        }).catch(e=>{
            res.json({message:e})
        })
       

    } catch (error) {
        return res.status(404).send({ error });
    }
}

//to get one order by id (unique)
export async function getOrderbyid(req, res){
    try {
        const order = await OrderModel.findOne({id:req.params.id});
        
        if(!order){
            return res.status(404).json({ message: "order not found" });
        
        }
        res.json(order);

    } catch (error) {
        return res.status(404).send({ error });
    }
}


//to add an order
export async function addOrder(req, res){
    try {
        const { id, customer_name, customer_email, product, quantity} = req.body;
       
        const orderid=new Promise((resolve, reject)=> {
            OrderModel.findOne({ id }, function(err, id){
                if(err) reject(new Error(err))
                if(id) reject({ error : "Please use unique id"});

                resolve();
            })
        });

        var order_value=0;
        if(product === "Product 1")order_value=29;
        if(product === "Product 2")order_value=49;
        if(product === "Product 3")order_value=149;
        
        order_value=order_value*quantity;

        Promise.all([ orderid])
            .then(() => {
                            const order = new OrderModel({
                                id,
                                customer_name,
                                customer_email,
                                product,
                                quantity,
                                order_value
                            });

                            // return save result as a response
                            order.save()
                                .then(result => res.status(201).send({ msg: "Order Saved Successfully"}))
                                .catch(error => res.status(500).send({error}))

            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(404).send({ error });
    }
}


//to edit order
export async function editOrder(req, res){
    try {
         const {id,product,quantity}  = req.body;
        //  const { id } = req.order;

         if(id){
             const body = req.body;
             var price = 0;
        if(product === "Product 1")price=29;
        if(product === "Product 2")price=49;
        if(product === "Product 3")price=149;

            body.order_value = price*quantity;
             // update the data
             OrderModel.updateOne({ id }, body, function(err, data){
                 if(err) throw err;
 
                 return res.status(201).send({ msg : "Record Updated...!"});
             })
 
         }else{
             return res.status(401).send({ error : "Order Not Found...!"});
         }
       

    } catch (error) {
        return res.status(401).send({ error });
    }
}


//to delete an order
export async function deleteOrder(req, res){
    const orderId = req.params.id; // Extract the order ID from the request parameters

    try {
        // Find the order by ID and delete it
        const deletedOrder = await OrderModel.findOneAndDelete({id:orderId});

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}