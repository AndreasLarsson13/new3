import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";
function shortenString(str) {
  if (str) {
    if (str.length > 15) {
      return str.slice(0, 30) + '...'; // Shorten and add "..."
    }
  }

  return str; // Return the original string if it's 15 characters or shorter
}


export function generateCartItemName(name: string, attributes: object) {

  if (!isEmpty(attributes)) {


    if (attributes.customOrder) {
      attributes.customOrder = "Special beställning"
    }


    const sortedAttributes = orderBy(attributes);

    /*     const uniqueArray = [...new Set(sortedAttributes)];
     */
    let shortString = shortenString(name)


    let combinedString = shortString + " " // Initialize an empty string


    /* sortedAttributes.forEach((attribute) => {
      if (typeof attribute.value !== "boolean") {
        combinedString += attribute.value; // Concatenate each attribute to the string
      }
    }); */



    return shortString;
  }

  let shortString;
  if (name !== null) {
    shortString = shortenString(name)

  }



  return shortString;
}
