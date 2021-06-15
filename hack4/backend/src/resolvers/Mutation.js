const Mutation = {
    insertPeople(parent, args, {db}, info) {
        console.log("insertPeople");
        try {
            for (let i = 0; i < args.data.length; ++i) {
                const person = db.people.find((person) => person.ssn === args.data[i].ssn);
                if (person) {
                    console.log("update")
                    person.name = args.data[i].name;
                    person.location = args.data[i].location;
                    person.severity = args.data[i].severity;
                } else {
                    console.log("insert")
                    db.people.push(args.data[i]);
                }
            }
        } catch (e) {
            return false;
        }
        
        // console.log(db.people);
        return true;
    }
}

export { Mutation as default };