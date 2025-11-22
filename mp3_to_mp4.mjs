import { spawn } from "child_process";
import { readdir, stat } from "fs/promises";
import path from "path";

/**
 * 核心转换函数：使用 FFmpeg 将一个文件从 MP4 转换为 MP3
 * @param {string} inputPath - 输入的 .mp4 文件路径
 * @param {string} outputPath - 输出的 .mp3 文件路径
 */
function convertFile(inputPath, outputPath) {
  // 返回一个 Promise，以便我们可以知道转换何时完成
  return new Promise((resolve, reject) => {
    // FFmpeg 的命令行参数
    // -i [inputPath] : 指定输入文件
    // -vn             : "Video No"，完全丢弃视频流
    // -ab 192k        : "Audio Bitrate"，设置 MP3 的比特率为 192kbps (这是一个高质量且通用的设置)
    // [outputPath]    : 指定输出文件
    const args = ["-i", inputPath, "-vn", "-ab", "192k", outputPath];

    // 1. 启动 FFmpeg 进程
    console.log(`[FFmpeg] 🚀 开始转换: ${path.basename(inputPath)}`);
    const ffmpeg = spawn("ffmpeg", args);

    // 2. 捕获 FFmpeg 的标准错误输出 (FFmpeg 习惯将进度信息输出到 stderr)
    let errorOutput = "";
    ffmpeg.stderr.on("data", (data) => {
      // 您可以取消注释下面这行来查看 FFmpeg 的详细输出
      // process.stderr.write(data.toString());
      errorOutput += data.toString();
    });

    // 3. 监听进程退出事件
    ffmpeg.on("close", (code) => {
      if (code === 0) {
        console.log(`[FFmpeg] ✅ 成功: ${path.basename(outputPath)}`);
        resolve();
      } else {
        console.error(
          `[FFmpeg] ❌ 失败 (退出码 ${code}): ${path.basename(inputPath)}`
        );
        console.error("FFmpeg 错误信息:", errorOutput);
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });

    // 4. 监听进程启动错误 (例如 'ffmpeg' 命令未找到)
    ffmpeg.on("error", (err) => {
      if (err.code === "ENOENT") {
        console.error("❌ 严重错误: 未找到 'ffmpeg' 命令。");
        console.error(
          "请确保您已正确安装 FFmpeg 并将其添加到了系统 PATH 环境变量中。"
        );
      } else {
        console.error(`启动 FFmpeg 失败: ${err.message}`);
      }
      reject(err);
    });
  });
}

/**
 * 主函数：扫描当前目录并执行所有转换
 */
async function runBatchConverter() {
  const currentDirectory = process.cwd(); // 获取当前脚本运行的目录
  console.log(`正在扫描 ${currentDirectory} 中的 .mp4 文件...`);

  try {
    const files = await readdir(currentDirectory);

    // 过滤出 .mp4 文件
    const mp4Files = files.filter(
      (file) => path.extname(file).toLowerCase() === ".mp4"
    );

    if (mp4Files.length === 0) {
      console.log("没有找到 .mp4 文件。");
      return;
    }

    console.log(`找到 ${mp4Files.length} 个文件，准备转换...`);

    // 遍历所有 MP4 文件
    for (const file of mp4Files) {
      const inputPath = path.join(currentDirectory, file);

      // 构造输出文件名 (例如: "video.mp4" -> "video.mp3")
      const outputName = path.basename(file, ".mp4") + ".mp3";
      const outputPath = path.join(currentDirectory, outputName);

      try {
        // 等待当前文件转换完成后再开始下一个
        await convertFile(inputPath, outputPath);
      } catch (error) {
        // 如果一个文件失败了，打印错误并继续处理下一个
        console.error(`跳过文件 ${file}，因为它转换失败了。`);
      }
    }

    console.log("\n🎉 全部转换完成！");
  } catch (err) {
    console.error(`读取目录时出错: ${err.message}`);
  }
}

// 启动脚本
runBatchConverter();
