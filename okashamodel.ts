// import mongoose from "mongoose";
// const { Schema } = mongoose;

// interface PaymentAttrs {
//   userId: string;
//   transactionId: string;
//   referenceNo: string;
//   organizationCode: number;
//   amount: number;
//   currency: string;
//   deleted: boolean;
//   dueDate: Date;
//   paymentDate?: Date;
//   status: string;
//   fee: number;
//   tax: number;
//   multipleId: string;
//   billStatus?: string;
// }

// interface PaymentDoc extends mongoose.Document {
//   userId: string;
//   transactionId: string;
//   referenceNo: string;
//   organizationCode: number;
//   amount: number;
//   currency: string;
//   deleted: boolean;
//   dueDate: Date;
//   paymentDate?: Date;
//   status: string;
//   fee: number;
//   tax: number;
//   multipleId: string;
//   billStatus?: string;
// }

// interface PaymentModel extends mongoose.Model<PaymentDoc> {
//   build(attrs: PaymentAttrs): PaymentDoc;
// }

// const paymentSchema = new Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     transactionId: {
//       type: String,
//       required: true,
//     },
//     referenceNo: {
//       type: String,
//       required: true,
//     },
//     organizationCode: {
//       type: Number,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     currency: {
//       type: String,
//       required: true,
//     },
//     deleted: {
//       type: Boolean,
//       default: false,
//       required: true,
//     },
//     dueDate: {
//       type: Date,
//       required: true,
//     },
//     paymentDate: {
//       type: Date,
//     },
//     status: {
//       type: String,
//       enum: ["PENDING", "COMPLETE", "FAILED"],
//       required: true,
//     },
//     fee: {
//       type: Number,
//       required: true,
//     },
//     tax: {
//       type: Number,
//       required: true,
//     },
//     multipleId: {
//       type: String,
//       required: true,
//     },
//     billStatus: {
//       type: String,
//       enum: ["PAID", "UNPAID", "BLOCKED"],
//     },
//   },
//   {
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//         delete ret.__v;
//         delete ret.multipleId;
//         delete ret.deleted;
//       },
//     },
//   }
// );

// paymentSchema.statics.build = (attrs: PaymentAttrs) => {
//   return new BillPayment(attrs);
// };

// const BillPayment = mongoose.model<PaymentDoc, PaymentModel>(
//   "BillPayment",
//   paymentSchema
// );

// export { BillPayment };
