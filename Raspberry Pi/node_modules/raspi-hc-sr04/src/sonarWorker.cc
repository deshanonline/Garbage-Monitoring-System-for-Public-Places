#include <wiringPi.h>
#include <nan.h>
#include "sonarWorker.h"

using v8::Function;
using v8::Local;
using v8::Number;
using v8::Value;
using v8::String;
using v8::Isolate;
using Nan::AsyncQueueWorker;
using Nan::AsyncWorker;
using Nan::Callback;
using Nan::HandleScope;
using Nan::New;
using Nan::Null;

// Constructor
SonarWorker::SonarWorker(Callback *callback, int TriggerPin, int EchoPin)
        : AsyncWorker(callback), triggerPin(TriggerPin), echoPin(EchoPin) {

    //init variables
    result = new char[80];            
}

// Destructor
SonarWorker::~SonarWorker() {
    result = NULL;
 }

// Async method
void SonarWorker::Execute() {
    pinMode(triggerPin, OUTPUT);
    pinMode(echoPin, INPUT);

    // printf("starting sonar method trigger=%d echo=%d\n", triggerPin, echoPin);
    digitalWrite(triggerPin, LOW);    //ensure state is LOW

    // Set high for 10microseconds to trigger
    digitalWrite(triggerPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(triggerPin, LOW);
        
    // Wait for high
    unsigned int start = 0;
    unsigned int end = 0;
    for(;;) {
        int value = digitalRead(echoPin);
        if (value != 0) {
            start = micros();
            break;
        }
    }

    // Time taken for high to switch to low
    for(;;) {
        int value = digitalRead(echoPin);
        if (value != 1) {
            end = micros();
            break;
        }
    }

    sprintf(result, "%d", end - start);
}

// Expected to be called once execute is completed
void SonarWorker::HandleOKCallback() {
    Isolate* isolate = Isolate::GetCurrent();
    
    const unsigned argc = 1;
    Local<Value> argv[argc] = { String::NewFromUtf8(isolate, result) };
    
    // Callback with the result
    callback->Call(isolate->GetCurrentContext()->Global(), 1, argv);
}