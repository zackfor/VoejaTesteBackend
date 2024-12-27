import { Module } from "@nestjs/common";
import * as admin from "firebase-admin";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: "FIRESTORE",
            useFactory: () => {
                const serviceAccount = require("../../config/service-account.json");
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });
                return admin.firestore();
            },
        },
    ],
    exports: ["FIRESTORE"],
})
export class FirebaseModule {}