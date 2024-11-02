export function detectMeow(analyzer: AnalyserNode): boolean {
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyzer.getByteFrequencyData(dataArray);
  
    // Basic meow detection - you might want to make this more sophisticated
    // Cats typically meow between 500-1000 Hz
    const meowFrequencyRange = {
      low: Math.floor(500 * bufferLength / analyzer.context.sampleRate),
      high: Math.floor(1000 * bufferLength / analyzer.context.sampleRate)
    };
  
    let meowEnergy = 0;
    for (let i = meowFrequencyRange.low; i < meowFrequencyRange.high; i++) {
      meowEnergy += dataArray[i];
    }
  
    // Adjust this threshold based on testing
    const threshold = 2000;
    return meowEnergy > threshold;
  }