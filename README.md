# Dilbert Scraper (nodejs)

This application just simply scraps all comic strips from the official dilbert.com website

2 things to take note of:
1. As this application doesn't keep track of whichever comic strip you have downloaded file to-date, you have to input the start date and end date yourself. Inputting the end date more than the latest comic strip (which is on the day that you run the application itself) will always get the latest comic strip instead
2. I think dilbert website will block users who has too many concurrent connections to it, and by many, I meant 2 or more. Thus, I have to change the nature of this scraper from asynchronous to synchronous