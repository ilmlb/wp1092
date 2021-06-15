const Mutation = {
    insertPeople(parent, args, {db}, info) {
        console.log("insertPeople");
        for (let i = 0; i < args.data.length; ++i) {
            const person = db.people.find((person) => person.ssn === args.data[i].ssn);
            if (person) {
                person.name = args.data[i].name;
                person.location = args.data[i].location;
                person.severity = args.data[i].severity;
            } else {
                db.people.push(args.data[i]);
            }
        }
        return true;
    }
}

export { Mutation as default };