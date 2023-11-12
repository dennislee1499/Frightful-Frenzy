# Frightful Frenzy

Description: 

Frightful Frenzy is a 2d game where your main goal is to stay alive! With each step you take and each monster you successfully evade, your score steadily climbs. Be prepared for the incoming onslaught because as your score gets higher, the speed of the monsters increase as well. Do you have what it takes to master the art of avoidance and secure your place as the ultimate monster dodging champion? 


Here's my [Live Site](https://dennislee1499.github.io/Frightful-Frenzy/)


<img width="1432" alt="Gameplay" src="https://github.com/dennislee1499/Frightful-Frenzy/assets/136773894/f98e10d8-d0f3-4363-9146-971b403bd53b">


## Functionality & MVPs 

In Frightful Frenzy, users will be able to:

- Start and restart the game if a collision with a monster occurs



  
![gameover](https://github.com/dennislee1499/Frightful-Frenzy/assets/136773894/d5868250-6128-47be-9aba-2bb854586819)






The overall design of the game relies heavily on collision detection. The logic works by checking for axis-aligned bounding box collisions. The code loops over each monster in the monsterManager.monsters array and checks for a collision with the player. If the player happens to collide with a monster, the game ends by calling the game over function. 

  

<img width="343" alt="Screenshot 2023-08-30 at 1 45 24 PM" src="https://github.com/dennislee1499/Frightful-Frenzy/assets/136773894/616ba5b0-8246-4ba6-aa30-371965758b2d">




<img width="371" alt="Screenshot 2023-08-30 at 1 46 10 PM" src="https://github.com/dennislee1499/Frightful-Frenzy/assets/136773894/4b42462e-f384-452b-9b5b-5e247d9fadb3">






- Use the arrow keys to control the movement of their character

![frightdemo](https://github.com/dennislee1499/Frightful-Frenzy/assets/136773894/71665bbd-51ae-440e-9aec-92bcc95fd5d2)

The arrow keys on the keyboard allow players to move the character left, right, up and down. Based on the movement of the character, the correct animation will be displayed.




<img width="427" alt="Screenshot 2023-08-30 at 1 36 07 PM" src="https://github.com/dennislee1499/Frightful-Frenzy/assets/136773894/fb7518cd-208a-41ab-a39b-08f20734e949">




<img width="271" alt="Screenshot 2023-08-30 at 1 32 11 PM" src="https://github.com/dennislee1499/Frightful-Frenzy/assets/136773894/4d2c9319-2a60-4f18-87af-2fecf00595a8">





- Experience higher difficulty as the game progresses

Every 100 score interval, the monsters speed will increase by 5% giving the user more of a challenge to overcome. 

<img width="526" alt="Screenshot 2023-08-30 at 1 39 29 PM" src="https://github.com/dennislee1499/Frightful-Frenzy/assets/136773894/a7e0ef77-138a-48c2-a324-2db6ec4d30b8">




- Feel a sense of achievement as you strive to beat your previous high score

## Wireframes 
<img src="Screenshot 2023-08-23 at 9.16.02 PM.png">

## Technologies, Libraries, APIs

- Vanilla Javascript
- Canvas
- SCSS
- HTML

## Implementation Timeline 
- Thursday - Set up skeleton, read up on documentation in order to execute project, start on handling character movement/display on canvas
- Friday - Display monster image, implement logic for generating monsters at random positions as well as monster movements
- Saturday - Logic for collision detection between the user and monster, input handling for movement using arrow keys, game over message if collision occurs
- Sunday - Work on better styling and refining movement for better gameplay
- Monday - Implementing logic for keeping track of players score, display score board on canvas
- Tuesday - Work on increasing monsters speed as game progresses, test for bugs
- Wednesday - Finishing touches for css, test for potential bugs, refining, upload to Github 
