const mongoose = require("mongoose");
const { format } = require('date-fns');
// creating schema
const eventcrudschema = mongoose.Schema({
  Name: { type: String },
  booked_date: { type: Date },
  venue: { type: String },
  event_date: { type: Date },
});
const eventcrud = mongoose.model("eventcrud", eventcrudschema);

//create crud-database

const createeventcrud = async (req, res) => {
  const { Name, booked_date, venue, event_date } = req.body;
  const crud_details = await eventcrud.create({
    Name,
    booked_date,
    venue,
    event_date,
  });
  res.json(crud_details);
};
// viewcrud
const vieweventcrud = async (req, res) => {
  try {
    const _id = req.params.id;
    const view_item = await eventcrud.findById(_id);

    if (!view_item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Extracting only the date part
    const booked_date = format(new Date(view_item.booked_date), 'dd-MM-yyyy');
    const event_date = format(new Date(view_item.event_date), 'dd-MM-yyyy');

    // Creating a new object with the extracted date fields
    const formattedItem = {
      ...view_item.toObject(),
      booked_date,
      event_date,
    };

    res.json(formattedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const viewevent = async (req, res) => {
  try {
    const view_items = await eventcrud.find();

    // Format each item's booked_date and event_date fields
    const formattedItems = view_items.map(item => {
      try {
        return {
          ...item.toObject(),
          booked_date: item.booked_date ? format(new Date(item.booked_date), 'dd-MM-yyyy') : null,
          event_date: item.event_date ? format(new Date(item.event_date), 'dd-MM-yyyy') : null,
        };
      } catch (error) {
        console.error('Error formatting dates:', error);
        return null;
      }
    }).filter(item => item !== null);

    res.json(formattedItems);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//deletecrud

const deleteeventcrud = async (req, res) => {
  const _id = req.params.id;
  const delete_item = await eventcrud.findByIdAndDelete(_id);
  res.json("details are removed");
};
//update-crud
const updateeventcrud = async (req, res) => {
  const { Name, booked_date, venue, event_date } = req.body;
  const _id = req.params.id;
  const update_item = await eventcrud.findByIdAndUpdate(_id, {
    Name,
    booked_date,
    venue,
    event_date,
  });
  res.json(update_item);
};

module.exports = {
  eventcrud,
  createeventcrud,
  vieweventcrud,
  deleteeventcrud,
  updateeventcrud,
  viewevent,
};
