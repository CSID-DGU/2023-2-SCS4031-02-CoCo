# jdk 17 버전 oracle
FROM openjdk:17
# JAR_FILE 변수 정의 -> 기본적으로 jar file이 2개이기 때문에 이름을 특정해야함
ARG JAR_FILE=./build/libs/trizzle-backend-0.0.1-SNAPSHOT.jar
# 지정한 jar 파일을 app.jar 라는 이름으로 Docker Container에 추가합니다.
ADD ${JAR_FILE} app.jar
# app.jar 파일을 실행합니다.
ENTRYPOINT ["java","-jar","/app.jar"]


