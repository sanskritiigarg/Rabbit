import { Subscriber } from "../models/subscriber.models.js";


const subscribe = async (req, res) => {
  const {email} = req.body;

  if (!email) {
    return res.status(400).json({message: "Email os required"});
  }

  try {
    let subscriber = await Subscriber.findOne({email});

    if (subscriber) return res.status(400).json({message: "Email is already subscribed"});

    subscriber = new Subscriber({email});
    await subscriber.save();

    res.status(201).json({message: "Successfully Subscribed to newsletter"});

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Server Error"});
  }
};

export {subscribe};