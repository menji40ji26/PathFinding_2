Pathfinding is needed in a wide range of games. I learned from an 
online tutorial and made this little project.

Steps:

1. Starts from point A. Puts it into an "open set".
2. Finds and stores all surrounding points into the "open set" waited to be checked.
3. Deletes point A from the “open set" and puts it into a "close set" which stores items no longer needed. 

Use the formula: F = G + H

G is the cost of moving from the starting point to its surroundings.
H is the cost of moving from one point to the end.

To write it in an abstract way, it will look like:
do {

 find the lowest F in all surroundings and put it into the "close set". Set this point as the "forward point"
 
 as for the rest of them, if ( it cannot be passed or it is in the "close set" ) {
 
  do nothing
  
 } else if ( it is not in the "open set" ) {
 
  put it into the "open set", and set the current point as the "parent" of this point. Calculate the FGH of this point.
  
 } else if ( it is in the "open set" ) {
 
  if ( it has lower G )
  
}

 set this point as the "forward point". recalculate the G and F of it.
 
} while ( the destination is already in the "open set". Then the path has been found )


return the path by connecting every "parent" point.


