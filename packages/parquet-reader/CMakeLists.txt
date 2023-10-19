cmake_minimum_required(VERSION 3.24)
cmake_policy(SET CMP0042 NEW)

set(CMAKE_CXX_STANDARD 17)
# Current oldest supported version according to https://endoflife.date/macos
set(CMAKE_OSX_DEPLOYMENT_TARGET 11.0)

project(arrow-parquet-reader)

set(NAPI_VERSION 6)

find_package(Arrow REQUIRED CONFIG)
find_package(fmt REQUIRED CONFIG)

set(SOURCE_FILES addon.cpp)
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(
  ${PROJECT_NAME}
  PRIVATE ${CMAKE_JS_LIB}
          fmt::fmt
          arrow::libparquet)

# Include Node-API wrappers
execute_process(
  COMMAND node -p "require('node-addon-api').include"
  WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
  OUTPUT_VARIABLE NODE_ADDON_API_DIR)
string(
  REGEX
  REPLACE "[\r\n\"]"
          ""
          NODE_ADDON_API_DIR
          ${NODE_ADDON_API_DIR})

target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_JS_INC} ${NODE_ADDON_API_DIR})
target_compile_definitions(${PROJECT_NAME} PRIVATE NAPI_VERSION=${NAPI_VERSION})
target_compile_features(${PROJECT_NAME} PRIVATE cxx_std_17)

add_custom_target(prebuild ALL
                  COMMAND npm run exec-from -- ${CMAKE_CURRENT_SOURCE_DIR} pkg-prebuilds-copy --baseDir .
                          --source $<PATH:RELATIVE_PATH,$<TARGET_FILE:${PROJECT_NAME}>,$<PATH:NORMAL_PATH,${CMAKE_SOURCE_DIR}>>
                          --name ${PROJECT_NAME} --napi_version ${NAPI_VERSION})
