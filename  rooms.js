// const ROOMS = new Array();
const ROOMS =[];
ROOMS.push(new Room());

function Room() {
    this.id = ROOMS.length + 1;
    this.room_users = [];

    this.get_id = function() {
        return(this.id);
    };

    this.roomates = function() {
        return(this.room_users);
    };

    this.addRoomates = function(new_user_in_room) {
        this.room_users.push(new_user_in_room)
        return(this.room_users);
    };

  }


module.exports.addRoom = () => {
    let new_room = new Room();
    ROOMS.push(new_room);
    //new_room.get_id();

    return ('New room created. The rooms is:' + new_room.get_id());
};

module.exports.getRoomById = (id_room) => {
    return (ROOMS.indexOf(id_room));
};

module.exports.getAllRooms = () => {
    return JSON.stringify(ROOMS,null,2);
};

module.exports.join_room = (id_room, user) => {
    id_room=Number(id_room);
    if (ROOMS.findIndex(x => x.id === id_room) !== -1) {
        let index_room_for_join = ROOMS.findIndex(x => x.id === id_room);
        console.log(ROOMS.findIndex(x => x.id === id_room), ROOMS, id_room);
        let room_for_join = ROOMS[index_room_for_join];
        room_for_join.addRoomates(user);
        return ('joined room:' + ROOMS.findIndex(x => x.id === id_room));
    } else {return ('Error 404. The room not found')};
};

