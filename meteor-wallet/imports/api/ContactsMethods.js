import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import { ContactsCollection } from "./ContactsCollection";

Meteor.methods({

    'contacts.insert'({name, email, imageUrl}) {
        check(name, String);
        check(email, String);
        check(imageUrl, String);
        if(!name){
            throw new Meteor.Error("Name is required.")
        }
        return ContactsCollection.insertAsync({ name, email, imageUrl, createdAt: new Date() });
    },

    'contacts.remove'({ contactId}) {
        check(contactId, String);
        return ContactsCollection.removeAsync(contactId);
    },

    'contacts.archive'({ contactId}){
        check(contactId, String);
        ContactsCollection.updateAsync({_id: contactId}, { $set: { archived: true}});
    }
})

