import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {SceneHook} from './scenes/SceneHook';
import {SceneChef} from './scenes/SceneChef';
import {SceneBridge} from './scenes/SceneBridge';
import {SceneTwoMinute} from './scenes/SceneTwoMinute';
import {SceneWeights} from './scenes/SceneWeights';
import {SceneOneToken} from './scenes/SceneOneToken';
import {SceneTokens} from './scenes/SceneTokens';
import {SceneDense} from './scenes/SceneDense';
import {SceneMathBytes} from './scenes/SceneMathBytes';
import {SceneMathLimit} from './scenes/SceneMathLimit';
import {SceneExample} from './scenes/SceneExample';
import {SceneMemoryBound, SceneCarryLess} from './scenes/SceneMemoryBound';
import {SceneBelowLimit} from './scenes/SceneBelowLimit';
import {SceneIdleChip} from './scenes/SceneIdleChip';
import {SceneTrap} from './scenes/SceneTrap';
import {SceneBurners} from './scenes/SceneBurners';
import {SceneBusyNotFull} from './scenes/SceneBusyNotFull';
import {SceneBatching, SceneSingleUser} from './scenes/SceneBatching';
import {ScenePrefill} from './scenes/ScenePrefill';
import {SceneDecode} from './scenes/SceneDecode';
import {SceneMetrics} from './scenes/SceneMetrics';
import {SceneTradeoff} from './scenes/SceneTradeoff';
import {ScenePriorities} from './scenes/ScenePriorities';
import {SceneTensor} from './scenes/SceneTensor';
import {SceneNVLink} from './scenes/SceneNVLink';
import {ScenePipeline} from './scenes/ScenePipeline';
import {SceneDataParallel, SceneStickySession} from './scenes/SceneDataParallel';
import {SceneExperts} from './scenes/SceneExperts';
import {SceneDecision} from './scenes/SceneDecision';
import {SceneKVBudget} from './scenes/SceneKVBudget';
import {SceneScaling} from './scenes/SceneScaling';
import {SceneProfile} from './scenes/SceneProfile';
import {SceneOverlap} from './scenes/SceneOverlap';
import {SceneEquation, SceneCeiling} from './scenes/SceneEquation';
import {SceneTradeoffs, SceneLog} from './scenes/SceneTradeoffs';
import {SceneBuildOrder} from './scenes/SceneBuildOrder';
import {SceneServer, SceneContinuous} from './scenes/SceneServer';
import {ScenePrefix, ScenePromptOrder, SceneHitRate} from './scenes/ScenePrefix';
import {SceneQuantize, SceneSlowPath} from './scenes/SceneQuantize';
import {SceneSpeculative} from './scenes/SceneSpeculative';
import {SceneSpecFormula, SceneDraftMatch} from './scenes/SceneSpecFormula';
import {SceneKernels, SceneGraph} from './scenes/SceneKernels';
import {SceneWarnings, SceneVersions} from './scenes/SceneWarnings';
import {SceneWorkload, SceneLoadHeadline, ScenePercentiles, SceneAccuracy} from './scenes/SceneBenchmark';
import {SceneShape, SceneRepeat, SceneFlaky, SceneFiveA, SceneFiveB} from './scenes/SceneTesting';
import {C} from './theme';

type Entry = {from: number; duration: number; node: React.ReactNode};

const scenes: Entry[] = [
  {from: 0, duration: 360, node: <SceneHook durationInFrames={360} />},
  {from: 360, duration: 425, node: <SceneChef durationInFrames={425} />},
  {from: 785, duration: 205, node: <SceneBridge durationInFrames={205} />},
  {from: 990, duration: 305, node: <SceneTwoMinute durationInFrames={305} />},
  {from: 1295, duration: 275, node: <SceneWeights durationInFrames={275} />},
  {from: 1570, duration: 214, node: <SceneOneToken durationInFrames={214} />},
  {from: 1784, duration: 299, node: <SceneTokens durationInFrames={299} />},
  {from: 2083, duration: 252, node: <SceneDense durationInFrames={252} />},
  {from: 2335, duration: 213, node: <SceneMathBytes durationInFrames={213} />},
  {from: 2548, duration: 401, node: <SceneMathLimit durationInFrames={401} />},
  {from: 2949, duration: 473, node: <SceneExample durationInFrames={473} />},
  {from: 3422, duration: 415, node: <SceneMemoryBound durationInFrames={415} />},
  {from: 3837, duration: 296, node: <SceneCarryLess durationInFrames={296} />},
  {from: 4133, duration: 298, node: <SceneBelowLimit durationInFrames={298} />},
  {from: 4431, duration: 236, node: <SceneIdleChip durationInFrames={236} />},
  {from: 4667, duration: 299, node: <SceneTrap durationInFrames={299} />},
  {from: 4966, duration: 529, node: <SceneBurners durationInFrames={529} />},
  {from: 5495, duration: 470, node: <SceneBusyNotFull durationInFrames={470} />},
  {from: 5965, duration: 364, node: <SceneBatching durationInFrames={364} />},
  {from: 6329, duration: 199, node: <SceneSingleUser durationInFrames={199} />},
  {from: 6528, duration: 565, node: <ScenePrefill durationInFrames={565} />},
  {from: 7093, duration: 509, node: <SceneDecode durationInFrames={509} />},
  {from: 7602, duration: 682, node: <SceneMetrics durationInFrames={682} />},
  {from: 8284, duration: 301, node: <SceneTradeoff durationInFrames={301} />},
  {from: 8585, duration: 443, node: <ScenePriorities durationInFrames={443} />},
  {from: 9028, duration: 856, node: <SceneTensor durationInFrames={856} />},
  {from: 9884, duration: 343, node: <SceneNVLink durationInFrames={343} />},
  {from: 10227, duration: 762, node: <ScenePipeline durationInFrames={762} />},
  {from: 10989, duration: 510, node: <SceneDataParallel durationInFrames={510} />},
  {from: 11499, duration: 192, node: <SceneStickySession durationInFrames={192} />},
  {from: 11691, duration: 590, node: <SceneExperts durationInFrames={590} />},
  {from: 12281, duration: 622, node: <SceneDecision durationInFrames={622} />},
  {from: 12903, duration: 721, node: <SceneKVBudget durationInFrames={721} />},
  {from: 13624, duration: 339, node: <SceneScaling durationInFrames={339} />},
  {from: 13963, duration: 670, node: <SceneProfile durationInFrames={670} />},
  {from: 14633, duration: 617, node: <SceneOverlap durationInFrames={617} />},
  {from: 15250, duration: 755, node: <SceneEquation durationInFrames={755} />},
  {from: 16005, duration: 323, node: <SceneCeiling durationInFrames={323} />},
  {from: 16328, duration: 646, node: <SceneTradeoffs durationInFrames={646} />},
  {from: 16974, duration: 425, node: <SceneLog durationInFrames={425} />},
  {from: 17399, duration: 325, node: <SceneBuildOrder durationInFrames={325} />},
  {from: 17724, duration: 473, node: <SceneServer durationInFrames={473} />},
  {from: 18197, duration: 625, node: <SceneContinuous durationInFrames={625} />},
  {from: 18822, duration: 616, node: <ScenePrefix durationInFrames={616} />},
  {from: 19438, duration: 356, node: <ScenePromptOrder durationInFrames={356} />},
  {from: 19794, duration: 576, node: <SceneHitRate durationInFrames={576} />},
  {from: 20370, duration: 577, node: <SceneQuantize durationInFrames={577} />},
  {from: 20947, duration: 333, node: <SceneSlowPath durationInFrames={333} />},
  {from: 21280, duration: 622, node: <SceneSpeculative durationInFrames={622} />},
  {from: 21902, duration: 641, node: <SceneSpecFormula durationInFrames={641} />},
  {from: 22543, duration: 590, node: <SceneDraftMatch durationInFrames={590} />},
  {from: 23133, duration: 1175, node: <SceneKernels durationInFrames={1175} />},
  {from: 24308, duration: 475, node: <SceneGraph durationInFrames={475} />},
  {from: 24783, duration: 726, node: <SceneWarnings durationInFrames={726} />},
  {from: 25509, duration: 361, node: <SceneVersions durationInFrames={361} />},
  {from: 25870, duration: 1051, node: <SceneWorkload durationInFrames={1051} />},
  {from: 26921, duration: 1009, node: <SceneLoadHeadline durationInFrames={1009} />},
  {from: 27930, duration: 1061, node: <ScenePercentiles durationInFrames={1061} />},
  {from: 28991, duration: 1323, node: <SceneAccuracy durationInFrames={1323} />},
  {from: 30314, duration: 428, node: <SceneShape durationInFrames={428} />},
  {from: 30742, duration: 703, node: <SceneRepeat durationInFrames={703} />},
  {from: 31445, duration: 770, node: <SceneFlaky durationInFrames={770} />},
  {from: 32215, duration: 807, node: <SceneFiveA durationInFrames={807} />},
  {from: 33022, duration: 820, node: <SceneFiveB durationInFrames={820} />},
];

export const Film: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <Audio src={staticFile('audio.wav')} />
      {scenes.map((s) => (
        <Sequence key={s.from} from={s.from} durationInFrames={s.duration} premountFor={30}>
          {s.node}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
