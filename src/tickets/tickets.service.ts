import { Injectable } from '@nestjs/common';
import { Query } from 'firebase-admin/firestore';
import { db } from '../firebase/firebase';

@Injectable()
export class TicketsService {
  async search(
    ticketId?: string,
    name?: string,
    movie?: string,
    seat?: string,
  ) {
    let query: Query = db.collection('tickets');

    if (ticketId) {
      query = query.where('ticketId', '==', ticketId);
    } else if (name) {
      query = query.where('name', '==', name);
    } else if (movie) {
      query = query.where('movie', '==', movie);
    } else if (seat) {
      query = query.where('seat', '==', seat);
    } else {
      return {
        success: false,
        message: 'Please provide ticketId, name, movie or seat.',
      };
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return {
        success: false,
        message: 'No tickets found.',
      };
    }

    const tickets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      count: tickets.length,
      data: tickets,
    };
  }
}