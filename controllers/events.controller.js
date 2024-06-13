import Events from "../models/events.model.js";

export const createEvent = async (req, res) => {
  const {
    eventName,
    eventDate,
    eventTime,
    eventLocation,
    eventDescription,
    eventImages,
  } = req.body;
  try {
    const newEvent = new Events({
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
      eventImages,
      user: req.user.id,
    });
    await newEvent.save();
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find().populate("user", "name username image");
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) return res.status(404).json({ message: "Event not found" });
    await Events.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
