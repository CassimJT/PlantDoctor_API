import Inference from "../models/Inference.mjs"

// Create new inference and broadcast
export const createInference = async (req, res, next) => {
  try {
    // Match the fields from your API client
    const { location, diseasname, confidence, variaty } = req.body
    
    // Validate required fields
    if (!location || !diseasname || confidence === undefined || !variaty) {
      return res.status(400).json({ 
        error: "Missing required fields: location, diseasname, confidence, variaty" 
      })
    }
    
    // Validate confidence range
    if (confidence < 0 || confidence > 1) {
      return res.status(400).json({ 
        error: "Confidence must be between 0 and 1" 
      })
    }
    
    const newInference = await Inference.create({ 
      location, 
      diseasname, 
      confidence, 
      variaty,
      timestamp: new Date()
    })

    const io = req.app.get("io")
    io.emit("inference:update", { 
      location, 
      diseasname, 
      confidence, 
      variaty, 
      timestamp: newInference.timestamp,
      id: newInference._id
    })

    res.status(201).json({ 
      message: "Inference created and broadcasted",
      inference: newInference
    })
  } catch (error) {
    next(error)
  }
}
// Add batch create endpoint
export const createBatchInferences = async (req, res, next) => {
  try {
    const { inferences } = req.body;
    
    if (!inferences || !Array.isArray(inferences) || inferences.length === 0) {
      return res.status(400).json({ error: "Invalid batch data" });
    }
    
    const results = [];
    const errors = [];
    
    for (const inference of inferences) {
      try {
        const { location, diseasname, confidence, variaty } = inference;
        
        // Validate required fields
        if (!location || !diseasname || confidence === undefined || !variaty) {
          errors.push({ error: "Missing required fields", data: inference });
          continue;
        }
        
        // Validate confidence range
        if (confidence < 0 || confidence > 1) {
          errors.push({ error: "Confidence must be between 0 and 1", data: inference });
          continue;
        }
        
        const newInference = await Inference.create({
          location,
          diseasname,
          confidence,
          variaty,
          timestamp: new Date()
        });
        
        results.push(newInference);
        
        // Broadcast each successful inference
        const io = req.app.get("io");
        io.emit("inference:update", {
          location,
          diseasname,
          confidence,
          variaty,
          timestamp: newInference.timestamp,
          id: newInference._id
        });
        
      } catch (error) {
        errors.push({ error: error.message, data: inference });
      }
    }
    
    res.status(201).json({
      message: `Batch processed: ${results.length} created, ${errors.length} failed`,
      successCount: results.length,
      errorCount: errors.length,
      results: results,
      errors: errors
    });
    
  } catch (error) {
    next(error);
  }
};

// Add route for batch endpoint
// router.post("/batch", authMiddleware, inferenceController.createBatchInferences)

// Get all inferences with optional filtering
export const listInferences = async (req, res, next) => {
  try {
    // query parameters for filtering
    const { disease, location, limit = 200, page = 1 } = req.query
    
    let query = {}
    if (disease) query.diseasname = disease
    if (location) query.location = location
    
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const inferences = await Inference.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Inference.countDocuments(query)
    
    res.json({ 
      inferences,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get single inference by ID
export const getInference = async (req, res, next) => {
  try {
    const inference = await Inference.findById(req.params.id)
    if (!inference) {
      return res.status(404).json({ error: "Inference not found" })
    }
    res.json({ inference })  
  } catch (error) {
    next(error)
  }
}

// Additional useful endpoints

// Get statistics by disease
export const getDiseaseStats = async (req, res, next) => {
  try {
    const stats = await Inference.aggregate([
      {
        $group: {
          _id: "$diseasname",
          count: { $sum: 1 },
          avgConfidence: { $avg: "$confidence" },
          locations: { $addToSet: "$location" }
        }
      },
      { $sort: { count: -1 } }
    ])
    
    res.json({ stats })
  } catch (error) {
    next(error)
  }
}

// Get inferences by location
export const getInferencesByLocation = async (req, res, next) => {
  try {
    const { location } = req.params
    const inferences = await Inference.find({ location })
      .sort({ timestamp: -1 })
      .limit(100)
    
    res.json({ inferences, count: inferences.length })
  } catch (error) {
    next(error)
  }
}

// Get inferences by disease
export const getInferencesByDisease = async (req, res, next) => {
  try {
    const { disease } = req.params
    const inferences = await Inference.find({ diseasname: disease })
      .sort({ confidence: -1 })
      .limit(100)
    
    res.json({ inferences, count: inferences.length })
  } catch (error) {
    next(error)
  }
}