//find blocks
  //find aspect ratio of Image
  //create array that represents blocks of the Image

//Create a loop that cycles through each blocks
//each loop then goes through every X pixel, saving the RGBA value in an array. The array can either be 2 dimensional and store every color value along with a count of how many times it came up, or add each color value and divide by the number to get the average.
// the value X will change to be a compromise between speed and accuracy

//At this point, we have a large array of color data, each containing an average color of the block.
  //This value can be exported as a photshop/affinity/etc palette.
//The data can also further be averaged together to get an average color of the whole image.
//At this point, I would further compress the data to give a 6 color traditional paint swatch. One color could be the page average and the others can be averages of the rest of the colors.
//I am not completely sure of the algorithm used to find the next most common colors, but one idea is to keep passing through the colors to find the closest colors and merge them. This would keep happening until we are down to enough colors.
//A stretch goal of this project would be to be able to tweak each color to the users liking, maybe having the option of keeping the other colors in sync to the tweaks.
// I would also like the ability to choose complementary colors and terchiery colors. Maybe even letting a user pick out a color or colors and having the program pick colors that can work well with what were picked.
