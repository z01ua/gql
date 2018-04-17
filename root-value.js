'use strict';
const { generateName }  = require('./utils/generate-name'),
  { generateCode }      = require('./utils/generate-code'),
  { generateEmail }     = require('./utils/generate-email');

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

class ratePlan {
  constructor() {
    this.code = Math.floor(Math.random()*1000);
  }
}

class roomType {
  constructor() {
    this.code = Math.floor(Math.random()*1000);
  }
}

class roomRates {
  constructor() {
/*    this.code = Math.floor(Math.random()*1000);*/
    this.hotelMappingId = "" + generateCode();
    this.channelManagerRoomRateId = "" + generateCode();
    this.channelManagerPmsRoomRateId = "" + generateCode();
    this.leonardoRoomTypeCode = "" + generateCode();
    this.leonardoRatePlanCode = "" + generateCode();
    this.channelManagerRoomRateDescription = "" + generateCode();
  }
}


// This class implements the RandomDie GraphQL type
class Hotel {
  constructor() {
    this.id = generateCode();
    this.code = "" + generateCode();
    this.name = generateName();
    this.emails = generateEmail();
    this.languagePreference = generateName();
    this.ratePlans = [new ratePlan()];
    this.roomTypes = [new roomType()];

    this.channelManagerHotelId = "" + generateCode();
    this.channelManagerPmsHotelId = "" + generateCode();
    this.leonardoHotelCode = this.code;
    this.hotelEmail = generateEmail();
    this.taxPercentage = "" + generateCode();
    this.roomRates = [new roomRates()];
  }
}

var hotelsList = Array.from(Array(10000).keys()).map(() => (new Hotel()));

// The root provides the top-level API endpoints
const rootValue = {
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  },
  hotel: function() {
    return new Hotel();
  },
  hotels: function({filter = null, page = 0, size = 10}) {
    var output = hotelsList,
    pagination = {};

    if(filter && filter.code) {
      output = output.filter(function(hotel) {
        return hotel.code && (new RegExp(filter.code)).test(hotel.code);
      });
    }

    pagination.page   = page;
    pagination.pages  = Math.ceil(output.length / size);
    pagination.size   = size;
    pagination.total  = output.length;

    output = output.slice(page * size, (page + 1) * size);

    return {items: output, pagination};
  },
  pagination: function() {
    return {

    };
  }
}

exports.rootValue = rootValue;
