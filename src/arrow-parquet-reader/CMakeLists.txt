cmake_minimum_required(VERSION 3.24)
cmake_policy(SET CMP0042 NEW)

project(arrow-parquet-reader)

set(NAPI_VERSION 6)

################# dependencies #################

set(CONAN_CMAKE_VERSION 0.18.1)
if(NOT EXISTS "${CMAKE_BINARY_DIR}/conan-${CONAN_CMAKE_VERSION}.cmake")
  message(STATUS "Downloading conan.cmake from https://github.com/conan-io/cmake-conan")
  file(DOWNLOAD "https://raw.githubusercontent.com/conan-io/cmake-conan/${CONAN_CMAKE_VERSION}/conan.cmake"
       "${CMAKE_BINARY_DIR}/conan-${CONAN_CMAKE_VERSION}.cmake" TLS_VERIFY ON)
endif()

set_directory_properties(PROPERTIES CMAKE_CONFIGURE_DEPENDS conanfile.txt)

include(${CMAKE_BINARY_DIR}/conan-${CONAN_CMAKE_VERSION}.cmake)

conan_cmake_autodetect(settings)
if(CMAOE_BUILD_TYPE STREQUAL Debug)
  set(COMPILER_RUNTIME MTD)
else()
  set(COMPILER_RUNTIME MT)
endif()
list(TRANSFORM settings REPLACE "compiler.runtime=.*" "compiler.runtime=${COMPILER_RUNTIME}")

conan_cmake_install(
  PATH_OR_REFERENCE
  ${CMAKE_SOURCE_DIR}
  BUILD
  missing
  SETTINGS
  ${settings})

list(APPEND CMAKE_PREFIX_PATH ${CMAKE_BINARY_DIR})

find_package(arrow REQUIRED CONFIG)
find_package(fmt REQUIRED CONFIG)
find_package(re2 REQUIRED CONFIG)

################################################

set(SOURCE_FILES addon.cpp)
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(
  ${PROJECT_NAME}
  PRIVATE ${CMAKE_JS_LIB}
          arrow::arrow
          fmt::fmt)

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

set(PACKAGE_ROOT ${CMAKE_SOURCE_DIR}/../..)
add_custom_target(prebuild ALL
                  COMMAND npx pkg-prebuilds-copy --baseDir ${PACKAGE_ROOT}
                          --source $<PATH:RELATIVE_PATH,$<TARGET_FILE:${PROJECT_NAME}>,$<PATH:NORMAL_PATH,${PACKAGE_ROOT}>>
                          --name ${PROJECT_NAME} --napi_version ${NAPI_VERSION})
