import { Injectable } from '@nestjs/common';
import { db } from '../firebase/firebase';
import * as crypto from 'crypto';

@Injectable()
export class AgentproService {
 async getVisitor(studentId: string) {
  const studentDoc = await db.collection('students').doc(studentId).get();

  if (!studentDoc.exists) {
    return {
      success: false,
      message: 'Student not found',
    };
  }

  const student = studentDoc.data();

  const secret = process.env.AGENTPRO_IDENTITY_SECRET!;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${student?.studentId}|${student?.email}`)
    .digest('hex');

  return {
    success: true,
    data: {
      userId: student?.studentId,
      name: student?.name,
      email: student?.email,
      signature,
    },
  };
}}