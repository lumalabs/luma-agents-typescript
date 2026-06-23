# Generations

Types:

- <code><a href="./src/resources/generations.ts">AdvancedControls</a></code>
- <code><a href="./src/resources/generations.ts">DepthControl</a></code>
- <code><a href="./src/resources/generations.ts">FaceControl</a></code>
- <code><a href="./src/resources/generations.ts">Generation</a></code>
- <code><a href="./src/resources/generations.ts">GenerationFailureCode</a></code>
- <code><a href="./src/resources/generations.ts">GenerationOutput</a></code>
- <code><a href="./src/resources/generations.ts">ImageRef</a></code>
- <code><a href="./src/resources/generations.ts">Model</a></code>
- <code><a href="./src/resources/generations.ts">NormalsControl</a></code>
- <code><a href="./src/resources/generations.ts">PoseControl</a></code>
- <code><a href="./src/resources/generations.ts">PoseControlStrength</a></code>
- <code><a href="./src/resources/generations.ts">SourcePosition</a></code>
- <code><a href="./src/resources/generations.ts">TrajectoryControl</a></code>
- <code><a href="./src/resources/generations.ts">VideoDuration</a></code>
- <code><a href="./src/resources/generations.ts">VideoEditOptions</a></code>
- <code><a href="./src/resources/generations.ts">VideoEditStrength</a></code>
- <code><a href="./src/resources/generations.ts">VideoOptions</a></code>
- <code><a href="./src/resources/generations.ts">VideoResolution</a></code>

Methods:

- <code title="post /generations">client.generations.<a href="./src/resources/generations.ts">create</a>({ ...params }) -> Generation</code>
- <code title="get /generations/{generation_id}">client.generations.<a href="./src/resources/generations.ts">get</a>(generationID) -> Generation</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">CreateFileResponse</a></code>
- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">FileList</a></code>
- <code><a href="./src/resources/files.ts">FilePurpose</a></code>
- <code><a href="./src/resources/files.ts">FileState</a></code>
- <code><a href="./src/resources/files.ts">PresignedUpload</a></code>

Methods:

- <code title="post /files">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> CreateFileResponse</code>
- <code title="get /files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FileList</code>
- <code title="delete /files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> void</code>
- <code title="post /files/{file_id}/complete">client.files.<a href="./src/resources/files.ts">complete</a>(fileID) -> File</code>
- <code title="get /files/{file_id}">client.files.<a href="./src/resources/files.ts">get</a>(fileID) -> File</code>
