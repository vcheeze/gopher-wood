import fetch from 'node-fetch';
import { firestore } from '../../firebase';

export async function post(req, res, next) {
  res.setHeader('content-type', 'application/json');
  
  const { fullName, date, time } = req.body;
  const payload = {
    fields: {
      fullName: {
        stringValue: fullName
      },
      timeslot: {
        timestampValue: new Date(`${date} ${time}`)
      }
    }
  };
  try {
    const response = await fetch(`${firestore.baseUrl}/${firestore.ivcAppointments}?key=${firestore.apiKey}` , {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (data) { // success
      res.statusCode = 201;
      res.end(JSON.stringify( { success: true, message: 'Created document', data }));
    } else {
      res.statusCode = 204;
      res.end(JSON.stringify({ success: true, message: 'No content' }));
    }
  } catch(err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, error: err }));
  }
}
