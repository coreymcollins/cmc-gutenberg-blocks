<?php
/**
 * Plugin Name: Gutenberg Blocks by Corey M Collins
 * Plugin URI: https://coreymcollins.com
 * Description: Playing around with Gutenberg Blocks and furiously trying to type "Gutenberg" instead of "Gutenburg" every single time.
 * Author: Corey M Collins
 * Author URI: https://coreymcollins.com
 * Version: 1.0.0
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CMCGutenberg
 *
 * @since  1.0.0
 */
final class CMC_Gutenberg_Blocks {

	/**
	 * Singleton instance of plugin.
	 *
	 * @var    WDS_Camera_On_Campus
	 * @since  1.0.0
	 */
	protected static $single_instance = null;

	/**
	 * Creates or returns an instance of this class.
	 *
	 * @since   1.0.0
	 * @return  WDS_Camera_On_Campus A single instance of this class.
	 */
	public static function get_instance() {
		if ( null === self::$single_instance ) {
			self::$single_instance = new self();
		}

		return self::$single_instance;
	}

	/**
	 * Add hooks and filters.
	 *
	 * @since  1.0.0
	 */
	public function hooks() {
		add_action( 'init', array( $this, 'init' ), 0 );
	}

	/**
	 * Init hooks
	 *
	 * @since  1.0.0
	 */
	public function init() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_scripts' ) );
	}

	/**
	 * Enqueue our editor scripts.
	 *
	 * @author Corey Collins
	 *
	 * @since  1.0.0
	 */
	public function editor_scripts() {

		// Set our version.
		$version = '1.0.0';

		// Register our scripts/styles first.
		wp_register_script( 'cmc-gutenberg-js', plugins_url( 'assets/scripts/editor.blocks.js', __FILE__ ), array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ), $version );
		wp_register_style( 'cmc-gutenberg-editor-css', plugins_url( 'assets/css/blocks-editor.css', __FILE__ ), array( 'wp-blocks' ), $version );

		// Enqueue our scripts and styles.
		wp_enqueue_script( 'cmc-gutenberg-js' );
		wp_enqueue_style( 'cmc-gutenberg-editor-css' );

		// Pass in REST URL.
		wp_localize_script(
			'cmc-gutenberg-js',
			'cmc_gutenberg',
			[
				'rest_url' => esc_url( rest_url() ),
			]
		);
	}
}

/**
 * Grab the CMC_Gutenberg_Blocks object and return it.
 * Wrapper for CMC_Gutenberg_Blocks::get_instance().
 *
 * @since  1.0.0
 * @return CMC_Gutenberg_Blocks  Singleton instance of plugin class.
 */
function cmc_gutenberg_blocks() {
	return CMC_Gutenberg_Blocks::get_instance();
}

// Kick it off.
add_action( 'plugins_loaded', array( cmc_gutenberg_blocks(), 'hooks' ) );
