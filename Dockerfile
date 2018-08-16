FROM nodejs:alpine
COPY . /home/node/app
WORKDIR /home/node/app
RUN npm install
CMD npm start
EXPOSE 3000