import { CollectionConfig } from "payload/types";

const Chat: CollectionConfig ={
    slug: 'chat',
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
      },
    fields:[
        {
            name: "message",
            label: "message",
            type: "textarea",
            required: true
        },
        {
            name: 'user',
            label: "User",
            type: "relationship",
            relationTo: "users"
        }
    ],
}

export default Chat