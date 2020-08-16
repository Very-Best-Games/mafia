console.log('Running rooms.js');

const ROOMS = new Array(); 

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
    return (ROOMS.entries['id']);
};

module.exports.join_room = (id_room, user) => {
    if (ROOMS.findIndex['id_room']) {
        let index_room_for_join = ROOMS.findIndex['id_room'];
        let room_for_join = ROOMS[index_room_for_join];
        room_for_join.addRoomates(user);
        return ('joined room:' + ROOMS.findIndex['id_room']);
    } else {return ('Error 404. The room not found')};
};

  