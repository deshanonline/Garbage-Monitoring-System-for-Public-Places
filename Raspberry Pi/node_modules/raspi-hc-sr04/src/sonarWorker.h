#ifndef SONAR_WORKER_H
#define SONAR_WORKER_H

#include <nan.h>

using Nan::AsyncWorker;
using Nan::Callback;

class SonarWorker : public AsyncWorker 
{
private:
    int triggerPin, echoPin, duration;
    char* result;
    
public:
    SonarWorker(Callback *callback, int EchoPin, int TriggerPin);
  
    ~SonarWorker();

    void Execute();
    void HandleOKCallback();
};

#endif