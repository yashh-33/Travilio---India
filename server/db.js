import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

// Ensure JSON data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths for JSON DB fallback
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const DESTINATIONS_FILE = path.join(DATA_DIR, 'destinations.json');

// Initialize empty files if they do not exist
const initJSONFile = (filePath, defaultData = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
};

initJSONFile(USERS_FILE);
initJSONFile(DESTINATIONS_FILE);

class FileDatabase {
  // Read database collections helper
  readCollection(file) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      return [];
    }
  }

  // Write database helper
  writeCollection(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Users Operations
  async findUserByQuery(query) {
    const users = this.readCollection(USERS_FILE);
    return users.find(u => {
      if (query.email && u.email === query.email) return true;
      if (query.username && u.username === query.username) return true;
      if (query.$or) {
        return query.$or.some(q => {
          if (q.email && u.email === q.email) return true;
          if (q.username && u.username === q.username) return true;
          return false;
        });
      }
      return false;
    });
  }

  async findUserById(id) {
    const users = this.readCollection(USERS_FILE);
    return users.find(u => u._id === id);
  }

  async saveUser(user) {
    const users = this.readCollection(USERS_FILE);
    const index = users.findIndex(u => u._id === user._id);
    if (index >= 0) {
      users[index] = user;
    } else {
      if (!user._id) user._id = Date.now().toString();
      users.push(user);
    }
    this.writeCollection(USERS_FILE, users);
    return user;
  }

  // Destinations Operations
  async findDestinations(search = '') {
    const dests = this.readCollection(DESTINATIONS_FILE);
    if (!search) return dests;

    const regex = new RegExp(search, 'i');
    return dests.filter(d => 
      regex.test(d.name) || 
      regex.test(d.state) || 
      regex.test(d.category)
    );
  }

  async findDestinationById(id) {
    const dests = this.readCollection(DESTINATIONS_FILE);
    return dests.find(d => d.id === id);
  }

  async seedDestinations(data) {
    this.writeCollection(DESTINATIONS_FILE, data);
  }
}

export const fileDb = new FileDatabase();

// Connect Function: attempts MongoDB connection, falls back to JSON DB
export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/travilio';
  try {
    console.log('Attempting to connect to MongoDB...');
    // We set a 3-second timeout for quick fallback
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log('Successfully connected to MongoDB!');
    return { type: 'mongodb' };
  } catch (err) {
    console.warn('⚠️ Could not connect to MongoDB. Falling back to robust Local File Database!');
    return { type: 'file' };
  }
};
